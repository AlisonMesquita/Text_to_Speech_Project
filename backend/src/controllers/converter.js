const fs = require("fs");
const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const path = require("path");

module.exports = {
	async convertMessage(message, fileName = "audio") {
		const textToSpeech = new TextToSpeechV1({
			authenticator: new IamAuthenticator({
				apikey: "Qy-QfaO7JXoZRnGT9F_asj3Ccjprz9BNwcCEsdip-PzS",
			}),
			serviceUrl:
				"https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/bf344751-9ccc-4fe1-b31b-e69971c88313",
		});

		const params = {
			text: message,
			voice: "pt-BR_IsabelaVoice", // Optional voice
			accept: "audio/wav",
		};

        const date = Date.now();
        const fName = `${fileName}${date}.wav`;
        const filepath = `${path.resolve(__dirname, '../../../frontend/public/' , 'audio')}`;

		// Synthesize speech, correct the wav header, then save to disk
		// (wav header requires a file length, but this is unknown until after the header is already generated and sent)
		// note that `repairWavHeaderStream` will read the whole stream into memory in order to process it.
		// the method returns a Promise that resolves with the repaired buffer
		await textToSpeech
			.synthesize(params)
			.then((response) => {
				const audio = response.result;
				return textToSpeech.repairWavHeaderStream(audio);
			})
			.then((repairedFile) => {
				fs.writeFileSync(`${filepath}\\${fName}`, repairedFile);
				console.log("audio.wav written with a corrected wav header");
			})
			.catch((err) => {
				console.log(err);
			});

            return {
                filepath: `${filepath}\\${fName}`
            };
	}
};
