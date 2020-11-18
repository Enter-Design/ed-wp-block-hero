import {Button, TextControl} from '@wordpress/components';
import {MediaUpload, RichText} from '@wordpress/block-editor';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( {
								  attributes,
								  className,
								  setAttributes,
							  } ) {

	const onSelectImage = ( media ) => {
		setAttributes( {
			heroImageURL: media.url,
			heroImageID: media.id,
		} );

	};

	const onChangeTitle = ( value ) => {
		setAttributes( { heroText: value } )
	};

	return (
		<div className={ className }>
			<RichText
				tagName="h1"
				placeholder={ __( 'Write Hero Text Here' ) }
				value={ attributes.heroText }
				onChange={ onChangeTitle }
			/>

			<div className="hero-image">
				<MediaUpload
					onSelect={ onSelectImage }
					allowedTypes="image"
					value={ attributes.heroImageID }
					render={ ( { open } ) => (
						<Button
							className={
								attributes.heroImageID
									? 'image-button'
									: 'button button-large'
							}
							onClick={ open }
						>
							{ ! attributes.heroImageID ? (
								__( 'Upload Hero Image' )
							) : (
								<img
									src={ attributes.heroImageURL }
									alt={ __( 'Uploaded Hero Image' ) }
								/>
							) }
						</Button>
					) }
				/>
			</div>
		</div>
	);
}
