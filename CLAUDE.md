# Goal 

implement minimalistic visual skeleton for display sequence of follwing senario with a fake dummy pages.

implment controller dashboard with buttons for docent.
this dashboard will act as a js-eval-tunnel controller.
if button is pressed, then send js code through js-eval-tunnel with relevant action according to senario.

# Senario 

there will be 5 screen, calling it as 'display1', 'display2', ..., 'display5'.
all 5 screen (display{1,2,3,4,5}) will goes through same phase. 

Phases will be 
- "before"
- "greeting"
- "painpoint_discovery"
- "opening"
- "demo"
- "solution_experience" 
- "closing" 
- "after"

for each display and phases there will be unique path for dummy page. 

So following bash expantion expression should be implemented. 

/display{1,2,3,4,5}/{before,greeting,painpoint_discovery,opening,demo,solution_experience,closing,after}

5*8 = 40 pages 

These 40 pages will be changed when docent presses button. 
Details will be included in this document.

# Docent controlling occation in senario

There will be this occation that docent will press button for transition. So button should be present in dashboard in this order.

 "'이전'단계로 전환" 
 "'인사'단계로 전환" 
 "'PainPoint체험'단계로 전환" 
 "'오프닝영상'단계로 전환" 
 "'시연'단계로 전환" 
 "'솔루션체험'단계로 전환" 
 "'클로징'단계로 전환" 
 "'이후' 단계로 전환"

Below is insruction for each button 

For button "'이전'단계로 전환" 
- Do nothing 
- button visual should be present not pressable state. 

For button  "'인사'단계로 전환" 
- Do nothing 
- button visual should be present not pressable state. 

For "'PainPoint체험'단계로 전환" 
- Do nothing 
- button visual should be present not pressable state. 

For "'오프닝영상'단계로 전환" 
- for tunnel "display2" send adx.nav("/display2/opening")
- for tunnel "display3" send adx.nav("/display3/opening")

For "'시연'단계로 전환" 
- for tunnel "display2" send adx.nav("/display2/demo")
- for tunnel "display3" send adx.nav("/display3/demo")

For "'솔루션체험'단계로 전환" 
- for tunnel "display2" send adx.nav("/display2/solution_experience")
- for tunnel "display3" send adx.nav("/display3/solution_experience")
- for tunnel "display4" send adx.nav("/display4/solution_experience")
- for tunnel "display5" send adx.nav("/display5/solution_experience")

For "'클로징'단계로 전환" 
- for tunnel "display2" send adx.nav("/display2/closing")
- for tunnel "display3" send adx.nav("/display3/closing")
- for tunnel "display4" send adx.nav("/display4/closing")
- for tunnel "display5" send adx.nav("/display5/closing")

For "'이후'단계로 전환" 
- for tunnel "display2" send adx.nav("/display2/after")
- for tunnel "display3" send adx.nav("/display3/after")

# Limitation
For docent to issue action, in this fake website.
All 5 browser for display1 to display5 should establish js-eval-tunnel with their id ("display1" to "display5")
by connecting to "/displayN/before" 

# TechStack 

vite, react, react-router-dom 



