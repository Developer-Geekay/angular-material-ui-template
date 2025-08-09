const fs = require('fs');
const readline = require('readline');

const pkgPath = './package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const [major, minor, patch] = pkg.version.split('.').map(Number);

rl.question(
  `Current version: ${pkg.version}. Bump to (m)ajor, (n)minor, or (p)patch? (default patch): `,
  (answer) => {
    let newVersion = '';
    switch (answer.trim().toLowerCase()) {
      case 'm':
        newVersion = `${major + 1}.0.0`;
        break;
      case 'n':
        newVersion = `${major}.${minor + 1}.0`;
        break;
      case 'p':
      case '':
        newVersion = `${major}.${minor}.${patch + 1}`;
        break;
      default:
        console.log('Invalid choice. Skipping version bump.');
        rl.close();
        return;
    }

    pkg.version = newVersion;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log(`✅ Version bumped to ${newVersion}`);

    // Optional: write version to src/environments/version.ts
    const versionFile = `// Auto-generated at build time\nexport const APP_VERSION = '${newVersion}';\n`;
    fs.writeFileSync('src/environments/version.ts', versionFile);

    rl.close();
  }
);
