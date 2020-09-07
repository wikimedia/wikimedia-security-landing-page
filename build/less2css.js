const path = require( 'path' );
const fs = require( 'fs' );
const less = require( 'less' );
const watch = require( 'node-watch' );

const INPUT_FILE = 'src/lib/main.less';
const INPUT_FILE_PATH = path.join( __dirname, '..', INPUT_FILE );
const WATCH_DIR = 'src/lib/';
const WATCH_DIR_PATH = path.join( __dirname, '..', WATCH_DIR );
const OUTPUT_FILE_PATH = path.join( __dirname, '../src/lib/main.css' );

let busy = false;

async function render() {
	try {
		const result = await less.render(
			fs.readFileSync( INPUT_FILE_PATH, 'utf8' ).toString(),
			{
				compress: true,
				filename: INPUT_FILE_PATH,
				paths: [ path.dirname( INPUT_FILE_PATH ) ]
			}
		);
		fs.writeFileSync( OUTPUT_FILE_PATH, result.css );
		console.log( `Compiled ${INPUT_FILE}` );
	} catch ( e ) {
		console.error( `Failed to compile ${INPUT_FILE}` );
		console.error( e );
	}
}

( async function main() {
	await render();

	if ( process.argv[ 2 ] === '--watch' ) {
		watch(
			WATCH_DIR_PATH,
			{
				persistent: true,
				recursive: true,
				delay: 1000,
				filter: ( fullpath ) => fullpath.endsWith( '.less' )
			},
			async function ( event, fullpath ) {
				console.log( `… changed ${fullpath}` );
				if ( !busy ) {
					busy = true;
					await render();
					busy = false;
				}
			}
		);
		console.log( `… watching for changes in ${WATCH_DIR}` );
	}
}() );
