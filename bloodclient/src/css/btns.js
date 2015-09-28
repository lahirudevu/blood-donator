var styles = {

	btn : {
		fontFamily: "'Roboto', sans-serif",
		textDecoration: "none",
		transition : '0.8s',

		':hover' : {
			textDecoration: 'none'
		}
	},

	btnPrimaryLarge: {

	  color: "#ffffff",
	  fontSize: "14px",
	  background: "#1F90FF",
	  padding: "12px 30px 12px 30px",
	  ':hover' : {
	  	background: '#2e89dd'
	  }

	},

	btnPrimary:{

	  color: "#ffffff",
	  fontSize: "10px",
	  background: "#1F90FF",
	  padding: "10px 20px 10px 20px",

	  ':hover' : {
	  	background: '#2e89dd'
	  }

	},

	btnSecondaryLarge: {

	  color: "#238bed",
	  fontSize: "14px",
	  background: "transparent",
	  padding: "12px 30px 12px 30px",
	  textDecoration: "none",
	  border: 'solid #238bed 1px',

	  ':hover' : {
	  	background: '#1F90FF',
	  	color: "#ffffff"	  
	  }

	},

	btnSecondary:{

	  color: "#238bed",
	  fontSize: "10px",
	  background: "transparent",
	  padding: "10px 20px 10px 20px",
	  textDecoration: "none",
	  border: 'solid #238bed 1px',

	  ':hover' : {
	  	background: '#1F90FF',
	  	color: "#ffffff"
	  }

	},

	btnoptLarge : {

	  color: '#ffffff',
	  fontSize: '14px',
	  background: '#FFA726',
	  padding: '12px 30px 12px 30px',

	  ':hover': {
		  background: '#f09009',
		}
	},

	btnopt : {

	  color: '#ffffff',
	  fontSize: '10px',
	  background: '#FFA726',
	  padding: '10px 20px 10px 20px',

	  ':hover': {
		  background: '#f09009'		}
	}

}

module.exports = styles;
