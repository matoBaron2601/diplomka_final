export const chunkRTC = async (formData: FormData) => {
	return await fetch('http://127.0.0.1:5000/rtc', {
		method: 'POST',
		body: formData
	});
};
