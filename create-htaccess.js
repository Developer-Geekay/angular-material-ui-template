const fs = require('fs');
const path = require('path');

// Define the content of the .htaccess file
const htaccessContent = `
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^.*$ /index.html [L]
</IfModule>
`;

// Define the path to the dist folder
const distFolderPath = path.join(__dirname, 'dist/angular-material-ui-template/browser');

// Define the path to the .htaccess file
const htaccessPath = path.join(distFolderPath, '.htaccess');

// Write the .htaccess file
fs.writeFile(htaccessPath, htaccessContent, (err) => {
  if (err) {
    console.error('Error writing .htaccess file:', err);
  } else {
    console.log('.htaccess file created successfully');
  }
});
