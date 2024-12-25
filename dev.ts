import { createDevServer } from 'vxrn'

main()

async function main() {
	const { viteServer, start, stop } = await createDevServer({
		root: process.cwd(),
		host: '127.0.0.1',
		webConfig: {
			plugins: [],
		},
		nativeConfig: {
			plugins: [],
		},
	})

	const { closePromise } = await start()

	viteServer.printUrls()

	process.on('beforeExit', () => {
		stop()
	})

	process.on('SIGINT', () => {
		stop()
	})

	process.on('uncaughtException', (err) => {
		console.error(err?.message || err)
	})

	await closePromise
}
