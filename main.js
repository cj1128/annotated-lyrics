const genJP = require("./jp")
const genCAN = require("./can")
const yargs = require("yargs")

const argv = yargs
  .usage("Usage: $0 <command> [options]")
  .command("jp", "Generate Japanese lyric pdf", {
    file: {
      alias: "f",
      required: true,
    },
    output: {
      alias: "o",
      describe: "output path, default to pdfs/[input-name].pdf",
    },
    style: {
      alias: "s",
      describe: "css style file",
      default: "jp.css",
    },
  })
  .command("can", "Generate Cantonese lyric pdf", {
    id: {
      alias: "i",
      required: true,
    },
    output: {
      alias: "o",
      describe: "output path, default to pdfs/[input-name].pdf",
    },
    style: {
      alias: "s",
      describe: "css style file",
      default: "can.css",
    },
  })
  .help("h")
  .alias("h", "help")
  .alias("v", "version")
  .argv

;(async () => {
  switch(argv._[0]) {
    case "jp":
      await genJP(argv.style, argv.file, argv.output)
      break

    case "can":
      await genCAN(argv.style, argv.id, argv.output)
      break

    default:
      yargs.showHelp()
      process.exit(1)
  }

  console.log("All done ⭐")
})()
