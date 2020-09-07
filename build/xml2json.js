var fs, xml2js,
	data, parser;

fs = require( 'fs' );
xml2js = require( 'xml2js' );

data = fs.readFileSync( process.argv[ 2 ], 'utf-8' );
parser = new xml2js.Parser();
parser.parseString( data, function ( err, result ) {
	var normal;
	if ( err ) {
		throw err;
	}

	// Reduce blog.json to only the relevant subset.
	// This reduces noise from unrelated changes on Phabricator.
	normal = {
		feed: {
			entry: result.feed.entry.map( function ( entry ) {
				return {
					id: entry.id,
					title: entry.title
				};
			} )
		}
	};
	process.stdout.write( JSON.stringify( normal, null, 4 ) + '\n' );
} );
