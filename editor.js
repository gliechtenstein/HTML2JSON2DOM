CM = function(gene) { 
  return {
    $type: "textarea",
    id: gene.id ? gene.id : null,
    _ed: null,
    _out: gene._out,
    _in: function(message) {
      if(this._ed) this._ed.setValue(message);
    },
    _default: {
      mode: "xml", htmlMode: true, lineNumbers: true, lineWrapping: true, lint: true, styleActiveLine: true, autoCloseBrackets: true, matchBrackets: true, viewportMargin: true, theme: "neo", gutters: ["CodeMirror-lint-markers"]
    },
    $init: function(){
      var self = this;
      for(var key in gene.options) {
        this._default[key] = gene.options[key];
      }
      this._ed = CodeMirror.fromTextArea(this, this._default);
      this._wrapper = this._ed.getWrapperElement();
      for(var key in gene.style) {
        this._wrapper.style[key] = gene.style[key];
      }
      try{
        this._ed.on("change", function(e){
          if(self._out) self._out(self._ed.getValue())
        })
      } catch (e) {}
      if(gene.value) {
        self._ed.setValue(gene.value);
        if(self._out) {
          setTimeout(function(){
            self._out(gene.value);
          },0)
        }
      }
    }
  }
}
