import path from "path";
import fs from "fs";
import shell from "shelljs";

export const nodeImportProvider = {
    tryImport(name) {
        const dirname = path.dirname(name);
        const basename = path.basename(name);
        const newPath = path.resolve(process.cwd(), dirname);
        shell.pushd("-q", newPath);
        const asmFile = path.resolve(process.cwd(), basename);
        const fileContents = fs.readFileSync(asmFile, { encoding: "utf8" });
        return fileContents;
    },
    importFinally() {
        shell.popd("-q");
    }
};
