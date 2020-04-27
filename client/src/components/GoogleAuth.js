import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId:
						"227027241637-oct7q2r9os846k3b4uqimut6ledbiklh.apps.googleusercontent.com",
					scope: "email",
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		}

		if (this.props.isSignedIn) {
			return (
				<button
					className="ui red google button"
					onClick={this.onSignOutClick}
				>
					<i className="google icon" />
					Sign Out
				</button>
			);
		}

		return (
			<button
				className="ui blue google button"
				onClick={this.onSignInClick}
			>
				<i className="google icon" />
				Sign In With Google
			</button>
		);
	}

	render() {
		return this.renderAuthButton();
	}
}

const mapeStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapeStateToProps, { signIn, signOut })(GoogleAuth);
