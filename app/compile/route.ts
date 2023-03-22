import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

async function compileCode(code: string) {
  const compilerDir = "./compiler";
  const filepath = `${compilerDir}/src/main.rs`;

  // fs.writeFileSync(path.resolve(filepath), code);

  const cmd = `cd ${compilerDir}; cargo run`;

  return new Promise(resolve => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(err) // some err occurred
      } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout:\n${stdout}`);
        console.error(`stderr:\n${stderr}`);
        resolve(stdout);
      }
    });
  });
}

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const output = await compileCode(code);
  return NextResponse.json({output});
}
