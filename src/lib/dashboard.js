import React from "react";
import Group from "../components/group/group";
import Chatbox from "../components/chatbox/chat";


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            group: "supergroup",
            startChatStatus: false
        };

        this.updateState = this.updateState.bind(this);
    }

    updateState(group) {
        this.setState({ group: group }, () => {
            console.log("State in parent:" + this.state.group);
            console.log("Group in parent" + group);
            return { group: group };
        });

        this.setState({ startChatStatus: true });
    }

    render() {
        return (
            <div>
                <Group updateState={this.updateState} />
                <Chatbox state={this.state} />

            </div>
        )
    }


}

export default Dashboard;