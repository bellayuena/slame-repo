import React, { Component } from 'react';
import { CometChat } from "@cometchat-pro/chat";
import { Link } from "react-router-dom";
import "./group.css";

class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.limit = 30;

        this.state = {
            groupList: [],
            activeGroup: ""
        };
    }

    componentDidMount() {
        this.groupsReq = new CometChat.GroupsRequestBuilder()
            .setLimit(this.limit)
            .build();

        this.groupsReq.fetchNext().then(
            groupList => {
                console.log("Groups list fetched successfully", groupList);
                this.setState({ groupList });
            },
            error => {
                console.log("Groups list fetching failed with error", error);
            }
        );
    }

    selectGroup(GUID) {
        this.password = "";
        this.groupType = CometChat.GROUP_TYPE.PUBLIC;
        this.props.updateState(GUID);
        CometChat.joinGroup(GUID, this.groupType, this.password).then(
            group => {
                console.log("Group joined successfully", group);
            },
            error => {
                console.log("Group joining failed with error", error);
            }
        );
    }

    render() {
        return (
            <div className="group">
                <div className="groupList">
                    <ul>
                        {this.state.groupList.map(groups => (
                            <li
                                key={groups.guid}
                                onClick={this.selectGroup.bind(this, groups.guid)}
                            >
                                <div className="groupName"># {groups.name}</div>

                            </li>
                        ))}

                    </ul>
                </div>
                <div className="createGroup">
                    <button className="createGroupBtn button">
                        <Link className="a" to="/creategroup">
                            Create Group
                                </Link>
                    </button>
                </div>
            </div>
        );
    }



}
export default Groups;