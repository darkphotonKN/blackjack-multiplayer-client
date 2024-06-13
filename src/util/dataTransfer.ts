// encode action into a buffer
export function encodeAction(
	clientId: string,
	actionType: number,
	actionData: string,
): Buffer {
	const clientIdBuffer = Buffer.from(clientId);
	const clientIdLengthBuffer = Buffer.from([clientId.length]);
	const actionDataBuffer = Buffer.from(actionData);
	const actionTypeBuffer = Buffer.from([actionType]);

	// construct action package into a single Buffer
	const actionPackageBuffer = Buffer.concat([
		clientIdLengthBuffer,
		clientIdBuffer,
		actionTypeBuffer,
		actionDataBuffer,
	]);

	console.log("actionPackageBuffer", actionPackageBuffer);
	return actionPackageBuffer;
}
