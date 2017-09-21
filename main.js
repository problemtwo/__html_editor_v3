window.onload = function(){
 function id(i){return document.getElementById(i);}
 function cls(c){return document.getElementsByClassName(c);}
 function tag(t){return document.getElementsByTagName(t);}
 
 [].forEach.call(tag('textarea'),function(el){
  el.onkeydown = function(e){
   if(e.keyCode === 9){
    const start = e.target.selectionStart, end = e.target.selectionEnd, value = e.target.value;
    e.target.value = value.substring(0,start) + new Array((parseInt(id('indent').value) || 1) + 1).join(' ') + value.substring(end);
    e.target.selectionStart = e.target.selectionEnd = start + (parseInt(id('indent').value) || 1);
    return false;
   }
  };
 });
 
 id('save-file').onclick = function(){
  window.localStorage.setItem('__html_editor_v3_html_' + id('filename').value,id('html').value);
  window.localStorage.setItem('__html_editor_v3_js_' + id('filename').value,id('js').value);
 };
 
 id('load-file').onclick = function(){
  id('html').value = window.localStorage.getItem('__html_editor_v3_html_' + id('filename').value);
  id('js').value = window.localStorage.getItem('__html_editor_v3_js_' + id('filename').value);
 };
 
 id('foreground-color').onkeydown = function(e){
  if(e.keyCode === 13){
   tag('html')[0].style.setProperty('--fg-color',id('foreground-color').value);
   return false;
  }
 };
 
 id('background-color').onkeydown = function(e){
  if(e.keyCode === 13){
   tag('html')[0].style.setProperty('--bg-color',id('background-color').value);
   return false;
  }
 };
 
 id('save-profile').onclick = function(){
  window.localStorage.setItem('__html_editor_v3_profile_' + id('profile-name').value + '_fg',tag('html')[0].style.getPropertyValue('--fg-color'));
  window.localStorage.setItem('__html_editor_v3_profile_' + id('profile-name').value + '_bg',tag('html')[0].style.getPropertyValue('--bg-color'));
 };
 
 id('load-profile').onclick = function(){
  tag('html')[0].style.setProperty('--fg-color',window.localStorage.getItem('__html_editor_v3_profile_' + id('profile-name').value + '_fg'));
  tag('html')[0].style.setProperty('--bg-color',window.localStorage.getItem('__html_editor_v3_profile_' + id('profile-name').value + '_bg'));
 };
 
 id('run').onclick = function(){
  id('output').innerHTML = id('html').value;
  try{
   eval(id('js').value);
  }catch(ex){
   id('log').value = ex.message;
  }
 };
};
