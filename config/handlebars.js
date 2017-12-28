module.exports = {

  defaultLayout: 'main',

  extname: '.html',

  helpers: {

    withSeparator: function(context, sep, options) {
      var output = '';

      for(var i = 0, j = context.length; i < j; i++) {
        output = output + options.fn(context[i]);
        if(i !== j - 1) { output += sep; }
      }
      return output;
    }
  }
};
