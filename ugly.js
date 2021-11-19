// Import Terser so we can use it
const { minify } = require('terser');

// Import fs so we can read/write files
const fs = require('fs');

// Define the config for how Terser should minify the code
// This is set to how you currently have this web tool configured
const config = {
  compress: {
    dead_code: true,
    drop_console: false,
    drop_debugger: true,
    keep_classnames: false,
    keep_fargs: true,
    keep_fnames: false,
    keep_infinity: false
  },
  mangle: {
    eval: false,
    keep_classnames: false,
    keep_fnames: false,
    toplevel: false,
    safari10: false
  },
  module: false,
  sourceMap: false,
  output: {
    comments: 'some'
  }
};

const publicFolder = './public/js/';


var files = [];

fs.readdirSync(publicFolder, {withFileTypes:true}).forEach(file => {

    if(file.isFile() && !file.name.endsWith("min.js")){
        files.push(publicFolder+file.name)
    }
    
  
});

files.forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  // Minify the code with Terser
  var minFile = file.replace('.js','.min.js')
  minify(code, config).then(r => fs.writeFileSync(minFile, r.code));

})
