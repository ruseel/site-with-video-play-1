# Goal 

implement minimalistic visual skeleton for display sequence of follwing senario 
with a fake dummy pages.

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

# Video Play 

Only below pages need to play video 

- /display2/opening
- /display3/opening

- /display2/solution_experience
- /display3/solution_experience
- /display4/solution_experience
- /display5/solution_experience

- /display2/closing
- /display3/closing

# Page - React Component 

Please make "{DisplayName}.jsx" and "{DisplayName}{PhaseName}".jsx and route to that component with react-router-dom with nested routing.

Inside "{DisplayName}.jsx" please initialize socket.io socket as App.jsx does with tunnel id setted with "{DisplayName}" in global name space. 

And register axd.nav function like "{DisplayName}.jsx" does. exact copy will works. 

# TechStack 

vite, react, react-router-dom 



