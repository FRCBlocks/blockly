var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var toolbox = document.getElementById('toolbox');

var options = {
	toolbox : toolbox,
	collapse : true,
	comments : true,
	disable : false,
	maxBlocks : Infinity,
	trashcan : true,
	horizontalLayout : false,
	toolboxPosition : 'start',
	css : true,
	media : 'https://blockly-demo.appspot.com/static/media/',
	rtl : false,
	scrollbars : true,
	sounds : true,
	oneBasedIndex : true,
	grid : {
		spacing : 20,
		length : 1,
		colour : '#888',
		snap : true
	},
	zoom : {
		controls : true,
		wheel : true,
		startScale : 1,
		maxScale : 3,
		minScale : 0.1,
		scaleSpeed : 1.1
	}
};

var workspace = Blockly.inject(
  blocklyDiv,
  options
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
  var languageDropdown = document.getElementById('languageDropdown');
  var languageSelection = languageDropdown.options[languageDropdown.selectedIndex].value;

  var codeDiv = document.getElementById('codeArea');

  var codeHolder = document.createElement('pre');
  codeHolder.className = 'prettyprint but-not-that-pretty';

  var code = document.createTextNode(Blockly[languageSelection].workspaceToCode(workspace));

  codeHolder.appendChild(code);
  codeDiv.replaceChild(codeHolder, codeDiv.lastElementChild);

  prettyPrint();
}
workspace.addChangeListener(onWorkspaceChange);
