"""Build the mail-in packet: covering letter, test, response form, therapist section.
Rendered to PDF through headless Chromium so the typography is real."""
import markdown, os, re
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
md = markdown.Markdown(extensions=['tables', 'sane_lists'])

def conv(path):
    md.reset()
    return md.convert(open(os.path.join(ROOT, path), encoding='utf-8').read())

LETTER = """
<div class="letter">
<p class="from">Jim McKenney<br>Eigenia Labs</p>
<p>Dear colleague,</p>
<p>I am trying to find out whether something composers do by ear can be written down
as a rule, and I have reached the point where the only way forward is to ask people
who do it for a living. There are five of you.</p>
<p>The test takes about twenty-five minutes. It is audio first and notation
afterwards, and the order matters, so please resist opening the score until Part 4
tells you to. Everything you will hear is the same eight bars, same key, same tempo,
same pedal, same tone. Only the scale changes.</p>
<p>I have deliberately not told you what the project predicts, and one of the four
situations you will be asked about is a check on whether people will answer anything
put in front of them. Every question can be answered with "nothing here fits", and
when that is the true answer it is the most useful one you can give me.</p>
<p>What I can promise is that your answers are published with the design and the
analysis, including the parts that do not suit the project. If the five of you say
the premise is wrong, that is the result and it gets written up as the result.</p>
<p>If you are a music therapist there is a further section at the back, and its
questions are harder and more important than the ones in the test.</p>
<p>With thanks for the time,</p>
<p class="sig">Jim McKenney</p>
<div class="reply">
<p><strong>To reply by post</strong></p>
<p>Fill in the response form, pages marked <em>Response form</em>, and return it to the
address below. To reply by email, the same form is in the pack as a plain text file
you can type into.</p>
<p class="addr">
Reply to: ______________________________________<br><br>
______________________________________<br><br>
______________________________________
</p>
<p class="small">If you would rather not post it, photograph the completed pages and
send the pictures. Legibility is not a problem; I would rather have your handwriting
than nothing.</p>
</div>
</div>
"""

CSS = """
@page { size: A4; margin: 22mm 20mm 20mm 20mm; }
html { -webkit-print-color-adjust: exact; }
body { font-family: "Times New Roman", Georgia, serif; font-size: 11.2pt; line-height: 1.48;
       color: #111; margin: 0; }
h1 { font-size: 19pt; line-height: 1.2; margin: 0 0 4mm 0; font-weight: 600;
     border-bottom: 1.4pt solid #111; padding-bottom: 2.5mm; }
h2 { font-size: 12.6pt; margin: 7mm 0 2.5mm 0; font-weight: 600; }
h3 { font-size: 11.4pt; margin: 5mm 0 2mm 0; font-weight: 600; }
p { margin: 0 0 3mm 0; text-align: justify; hyphens: auto; }
ul, ol { margin: 0 0 3mm 0; padding-left: 6mm; }
li { margin-bottom: 1.6mm; }
blockquote { margin: 3mm 0 3mm 5mm; padding-left: 4mm; border-left: 2pt solid #999;
             font-style: normal; }
table { border-collapse: collapse; width: 100%; margin: 3mm 0 4mm 0; font-size: 9.8pt;
        page-break-inside: avoid; }
th, td { border: 0.5pt solid #666; padding: 1.8mm 2mm; text-align: left; vertical-align: top; }
th { background: #eee; font-weight: 600; }
code { font-family: "Courier New", monospace; font-size: 9.4pt; background: #f2f2f2;
       padding: 0.3mm 1mm; }
hr { border: 0; border-top: 0.5pt solid #bbb; margin: 6mm 0; }
.page-break { page-break-before: always; }
.letter { font-size: 11.4pt; }
.letter .from { text-align: right; margin-bottom: 8mm; line-height: 1.35; }
.letter .sig { margin-top: 6mm; font-style: italic; }
.reply { margin-top: 9mm; border: 0.8pt solid #111; padding: 4mm 5mm; }
.reply .addr { font-family: "Courier New", monospace; line-height: 2.0; margin-top: 3mm; }
.small { font-size: 9.6pt; color: #444; }
.sectionmark { font-size: 9pt; letter-spacing: 0.09em; text-transform: uppercase;
               color: #555; margin-bottom: 2mm; }
/* the response form needs room to write in */
.form table td { height: 11mm; }
.form table th { height: auto; }
"""

def section(mark, html, cls=""):
    return f'<div class="page-break {cls}"><p class="sectionmark">{mark}</p>{html}</div>'

doc = f"""<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>
{LETTER}
{section("The listening test", conv("LISTENING-TEST.md"))}
{section("Response form", conv("RESPONSE-FORM.md"), "form")}
{section("For music therapists only", conv("THERAPIST-SECTION.md"))}
</body></html>"""

out_html = os.path.join(ROOT, "print", "packet.html")
os.makedirs(os.path.dirname(out_html), exist_ok=True)
open(out_html, "w", encoding="utf-8").write(doc)

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto("file://" + out_html)
    pg.pdf(path=os.path.join(ROOT, "print", "MPN-LISTENING-PACKET.pdf"),
           format="A4", print_background=True,
           display_header_footer=True,
           header_template='<div></div>',
           footer_template='<div style="font-family:Georgia,serif;font-size:8pt;color:#666;'
                           'width:100%;text-align:center;">'
                           'MPN listening test &middot; Jim McKenney &middot; '
                           'page <span class="pageNumber"></span> of <span class="totalPages"></span>'
                           '</div>',
           margin={"top": "18mm", "bottom": "16mm", "left": "20mm", "right": "20mm"})
    b.close()
print("wrote print/MPN-LISTENING-PACKET.pdf")
