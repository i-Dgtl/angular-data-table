import { ColumnTotalWidth } from './math';

/**
 * Shim layer with setTimeout fallback
 * http://www.html5rocks.com/en/tutorials/speed/animations/
 */
export var requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/**
 * Returns the columns by pin.
 * @param {array} colsumns
 */
export function ColumnsByPin(cols){
  var ret = {
    left: [],
    center: [],
    right: []
  };

  for(var i=0, len=cols.length; i < len; i++) {
    var c = cols[i];
    if(c.frozenLeft){
      ret.left.push(c)
    } else if(c.frozenRight){
      ret.right.push(c);
    } else {
      ret.center.push(c);
    }
  }

  return ret;
};

/**
 * Returns the widths of all group sets of a column
 * @param {object} groups 
 * @param {array} all 
 */
export function ColumnGroupWidths(groups, all){
  return {
    left: ColumnTotalWidth(groups.left),
    center: ColumnTotalWidth(groups.center),
    right: ColumnTotalWidth(groups.right),
    total: ColumnTotalWidth(all)
  };
}

/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj  
 * @param {string} path 
 */
export function DeepValueGetter(obj, path) {
  if(!obj || !path) return obj;

  var current = obj,
      split = path.split('.');

  if(split.length){
    for(var i=0, len=split.length; i < len; i++) {
      current = current[split[i]]; 
    }
  }
  
  return current;
};

/**
 * Converts strings from something to camel case
 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
 * @param  {string} str 
 * @return {string} camel case string
 */
export var CamelCase = function(str) {
  // Replace special characters with a space
  str = str.replace(/[^a-zA-Z0-9 ]/g, " ");
  // put a space before an uppercase letter
  str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
  // Lower case first character and some other stuff
  str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
  // uppercase characters preceded by a space or number
  str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function(a,b,c) {
      return b.trim()+c.toUpperCase();
  });
  return str;
};
