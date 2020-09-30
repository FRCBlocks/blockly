var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');

var workspace = Blockly.inject(
  blocklyDiv,
  {media: '../../media/', toolbox: document.getElementById('toolbox')}
);


// Handle resizing of the window
var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);


// Update code on block change
function onWorkspaceChange(event) {
  // var languageDropdown = document.getElementById('languageDropdown');
  // var languageSelection = languageDropdown.options[languageDropdown.selectedIndex].value;
  var codeDiv = document.getElementById('codeArea');
  var codeHolder = document.createElement('pre');
  codeHolder.className = 'prettyprint but-not-that-pretty';
  // var code = document.createTextNode(Blockly[languageSelection].workspaceToCode(workspace));
  var code = document.createTextNode(Blockly["JavaScript"].workspaceToCode(workspace));
  codeHolder.appendChild(code);
  codeDiv.replaceChild(codeHolder, codeDiv.lastElementChild);
  prettyPrint();
}
workspace.addChangeListener(onWorkspaceChange);
