/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Button, Placeholder } = wp.components;
const { Component }           = wp.element;
const { __ }                  = wp.i18n;

/**
 * Internal dependencies
 */
import { PlaceholderSpecificMode, EditModeOption } from '../../components/block-controls';
import { getOptionLabel }          from '../../components/item-select';
import { BlockContent }            from './block-content';
import { ContentSelect }           from './content-select';
import { LABEL }                   from './index';

/**
 * Component for displaying a UI within the block.
 */
export class BlockControls extends Component {
	/**
	 * Render the internal block UI.
	 *
	 * @return {Element}
	 */
	render() {
		const { icon, attributes, setAttributes, blockData } = this.props;
		const { mode } = attributes;
		const { options } = blockData;

		let output;

		switch ( mode ) {
			case 'all' :
				output = (
					<BlockContent { ...this.props } />
				);
				break;

			case 'wcb_speaker' :
			case 'wcb_speaker_group' :
				output = (
					<PlaceholderSpecificMode
						label={ getOptionLabel( mode, options.mode ) }
						icon={ icon }
						content={
							<BlockContent { ...this.props } />
						}
						placeholderChildren={
							<ContentSelect { ...this.props } />
						}
					/>
				);
				break;

			default :
				output = (
					<Placeholder
						className={ classnames( 'wordcamp__edit-placeholder', 'has-no-mode' ) }
						icon={ icon }
						label={ LABEL }
					>
						<EditModeOption
							content={
								<Button
									isDefault
									isLarge
									onClick={ () => {
										setAttributes( { mode : 'all' } );
									} }
								>
									{ getOptionLabel( 'all', options.mode ) }
								</Button>
							}
						/>

						<EditModeOption
							content={
								<ContentSelect
									icon={ icon }
									label={ __(
										'Choose specific speakers or groups',
										'wordcamporg' ) }
									{ ...this.props }
								/>
							}
						/>
					</Placeholder>
				);
				break;
		}

		return output;
	}
}
