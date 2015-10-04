import Color from 'color';
import hpl from './helpers/hpl-button';
import $ from './helpers/variables';

export default {
  base: {
    backgroundColor: $.def,
    borderStyle: 'solid',
    borderWidth: '1px',
  	borderColor: Color($.def).darken(0.1).hexString(),
  	display: 'inline-block',
  	marginBottom: 0, // For input.btn
  	fontWeight: 400,
  	textAlign: 'center',
  	verticalAlign: 'middle',
  	touchAction: 'manipulation',
  	cursor: 'pointer',
  	backgroundImage: 'none', // Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214
  	//border: '1px solid transparent',
  	textDecoration: 'none',
  	whiteSpace: 'nowrap',
    borderRadius: $.bordeRadiusBase
    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
  },
  small: {
    padding: `${$.btnPaddingVertical} ${$.btnPaddingHorizontal}`,
    fontSize: '.9em',
    lineHeight: 1.444,
    borderRadius: $.bordeRadiusBase
  },
  large: {

  },
  largest: {
    padding: `${$.btnPaddingLgVertical} ${$.btnPaddingLgHorizontal}`,
    fontSize: '1.6em',
    fontWeight: '400',
    lineHeight: 1.444,
    borderRadius: $.bordeRadiusBase
  },
  normal: hpl.buttonVariant($.primaryDark, $.def, Color($.def).darken(0.1).hexString()),
  primary: hpl.buttonVariant('#fff', $.primary, Color($.primary).darken(0.1).hexString()),
  danger: hpl.buttonVariant('#fff', $.danger, Color($.danger).darken(0.1).hexString()),
  save: hpl.buttonVariant('#fff', $.warning, Color($.warning).darken(0.1).hexString()),
  secondory: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: $.btnSecColor,
    color: $.btnSecColor,
    ':hover': {
      color: $.primary,
      borderColor: $.primary,
      textDecoration: 'none'
    },
    ':focus': {
      color: $.primary,
      borderColor: $.primary,
      textDecoration: 'none'
    },
    ':active': {
      color: $.primary,
      borderColor: $.primary,
      textDecoration: 'none'
    }
  },
  secondory2: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: $.primary,
    color: $.primary,
    ':hover': {
      color: Color($.primary).darken(0.1).hexString(),
      borderColor: Color($.primary).darken(0.1).hexString(),
      textDecoration: 'none'
    },
    ':focus': {
      color: Color($.primary).darken(0.1).hexString(),
      borderColor: Color($.primary).darken(0.1).hexString(),
      textDecoration: 'none'
    },
    ':active': {
      color: Color($.primary).darken(0.1).hexString(),
      borderColor: Color($.primary).darken(0.1).hexString(),
      textDecoration: 'none'
    }
  }
};
