import wallet from "../turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"


//const wallet = require("../turbin3-wallet.json");
// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);


umi.use(irysUploader({address: "https://devnet.irys.xyz/",}));
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        //const image = await readFile("solana-starter/ts/cluster1/assets/generug.png");
        const image = await readFile("/home/vi/web3/solana-starter/ts/cluster1/assets/generug.png");
        //2. Convert image to generic file.
        const generic_file = createGenericFile(image, "generug.png", {
            contentType: "image/png",
        })
        //3. Upload image
        //const [myUrl] = await Uint8ClampedArray.uploader.Upload([generic_file])
        const [myUri] = await umi.uploader.upload([generic_file])

        // const image = ???

        // const [myUri] = ??? 
        console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
