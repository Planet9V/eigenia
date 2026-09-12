import json, os, random, subprocess, numpy as np, wave

HERE=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.dirname(HERE)
stim=json.load(open("/home/claude/a4-sim/stimuli.json"))

# --- the melody, in scale degrees. Touches every degree so the mode is exposed.
MELODY=[(1,1),(2,1),(3,2),(4,1),(3,1),(2,2),(5,1),(4,1),(3,1),(2,1),(3,4),
        (5,1),(6,1),(7,2),(8,1),(7,1),(6,2),(5,1),(4,1),(3,1),(2,1),(1,4)]
NAT=[0,2,4,5,7,9,11]; LET="cdefgab"
ACC={-2:"eses",-1:"es",0:"",1:"is",2:"isis"}

def ly_pitch(deg, semis, octave_shift=0):
    """deg 1..8 -> lilypond pitch string, spelled by letter position."""
    if deg==8: idx,sem,oc=0,12,1
    else: idx,sem,oc=deg-1,semis[deg-1],0
    a=sem-(NAT[idx]+(12 if deg==8 else 0))
    a=max(-2,min(2,a))
    return LET[idx]+ACC[a]+("'"*(1+oc+octave_shift))

def ly_dur(q): return {1:"4",2:"2",4:"1"}[q]

def lilypond(semis, title):
    notes=" ".join(ly_pitch(d,semis)+ly_dur(q) for d,q in MELODY)
    return f"""\\version "2.24.0"
\\header {{ title = "{title}" tagline = ##f }}
\\score {{
  \\new PianoStaff <<
    \\new Staff {{ \\clef treble \\time 4/4 \\tempo 4 = 100 \\key c \\major {notes} \\bar "|." }}
    \\new Staff {{ \\clef bass \\time 4/4 {"c1 "*8}\\bar "|." }}
  >>
  \\layout {{ }}
}}"""

# --- audio
SR=44100; BPM=100; QS=60.0/BPM
def tone(f,dur,amp=0.22,harm=(1,.45,.28,.14,.07)):
    n=int(SR*dur); t=np.arange(n)/SR
    y=sum(a*np.sin(2*np.pi*f*(k+1)*t) for k,a in enumerate(harm))
    env=np.ones(n); at=int(SR*0.01); rl=int(SR*min(0.30,dur*0.5))
    env[:at]=np.linspace(0,1,at); env[-rl:]=np.linspace(1,0,rl)
    env*=np.exp(-2.2*t/max(dur,1e-6))*0.65+0.35
    return amp*y*env
def midi_hz(m): return 440.0*2**((m-69)/12.0)

def render(semis, path):
    total=sum(q for _,q in MELODY)*QS
    buf=np.zeros(int(SR*(total+1.2)))
    # pedal: low C, one per bar
    for bar in range(8):
        st=int(SR*bar*4*QS); s=tone(midi_hz(36),4*QS,amp=0.16,harm=(1,.3,.12))
        buf[st:st+len(s)]+=s
    pos=0.0
    for d,q in MELODY:
        sem=12 if d==8 else semis[d-1]
        st=int(SR*pos); s=tone(midi_hz(72+sem),q*QS)
        buf[st:st+len(s)]+=s; pos+=q*QS
    buf/=max(1e-9,np.abs(buf).max()/0.92)
    w=wave.open(path,"w"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((buf*32767).astype("<i2").tobytes()); w.close()

def build(family, prefix, seed):
    rng=random.Random(seed)
    items=list(family.items()); rng.shuffle(items)
    labels=[chr(ord('A')+i) for i in range(len(items))]
    key={}
    for lab,(code,p) in zip(labels,items):
        semis=p["semitones_from_tonic"]
        key[lab]={"internal":code,"degrees":p["degree_formula"],
                  "true_name":p.get("true_name","(unnamed rotation)"),
                  "brightness":p["brightness_raised_minus_lowered"],
                  "tritone":p["has_tritone_above_tonic"],"perfect_fifth":p["has_perfect_fifth"]}
        ly=os.path.join(ROOT,"scores",f"{prefix}-{lab}.ly")
        open(ly,"w").write(lilypond(semis, f"{prefix} {lab}"))
        wav=os.path.join(ROOT,"audio",f"{prefix}-{lab}.wav"); render(semis,wav)
    return key

k1=build(stim["diatonic"],"Set-1",4242)
k2=build(stim["invented"],"Set-2",777)
json.dump({"Set-1":k1,"Set-2":k2},open(os.path.join(ROOT,"ANSWER-KEY.json"),"w"),indent=1)
print("built", len(k1)+len(k2), "items")
