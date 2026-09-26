#!/bin/bash
cd /home/z/my-project || exit 1
STYLE="bright professional corporate event photography at a modern technology company, deep blue accent lighting and blue-white decor, candid documentary style, natural light, shallow depth of field, high quality, detailed, no text, no words, no logos, no watermark"
gen() { [ -s "public/images/$2" ] && { echo "SKIP $2"; return; }; z-ai image -p "$1" -o "public/images/$2" -s "$3" >/dev/null 2>&1 && echo "OK $2" || echo "FAIL $2"; }

case "$1" in
batch-a)
  gen "large keynote stage with a speaker silhouette and glowing blue LED screen, audience of seated professionals, $STYLE" ev-summit.jpg 1344x768
  gen "team workshop around a wooden table with laptops colorful sticky notes and whiteboard, engaged employees collaborating, $STYLE" ev-workshop.jpg 1344x768
  gen "diverse team of colleagues celebrating outdoors on green hilltop at golden hour arms raised joyful, $STYLE" ev-offsite.jpg 1344x768
  gen "office anniversary party with blue and white balloons confetti and string lights, employees cheering with drinks, $STYLE" ev-anniversary.jpg 1344x768
  gen "product launch event on stage with large screen showing a modern software dashboard, presenter with microphone, $STYLE" ev-launch.jpg 1344x768
  ;;
batch-b)
  gen "executive roundtable discussion in a modern glass-walled boardroom with city view, professionals in discussion, $STYLE" ev-roundtable.jpg 1344x768
  gen "professional woman speaking at an industry conference podium with blue stage lights and audience bokeh, $STYLE" ev-keynote.jpg 1344x768
  gen "modern open office interior with plants lounge areas and blue accent furniture, daylight through large windows, no people, architectural photography, high quality, detailed, no text" gl-office.jpg 1152x864
  gen "young team laughing together on a sofa in a bright office lounge, casual friday atmosphere, candid, high quality, detailed, no text, no watermark" gl-team.jpg 1152x864
  gen "employee receiving a crystal award trophy on stage, elegant blue stage lighting and applause, corporate gala, high quality, detailed, no text, no watermark" gl-award.jpg 1152x864
  ;;
esac
echo "BATCH_$1_DONE"
