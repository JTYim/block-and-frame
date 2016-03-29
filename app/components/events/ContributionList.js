import React, { Component } from 'react';
import Contribution from './ContributionListItem';
import ContributeButton from './ContributeButton';

class ContributionList extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    $('.message .close').on('click', function () {
      $(this).closest('.message').transition('fade');
    });
  }

  render() {
    const openContributions = this.props.contributions.reduce((prev, current) => {
      if (!current.bringer) {
        return true;
      }
      return prev;
    }, false);
    return (
      <div>
        <div className={`ui attached ${this.props.msgDivClass} message`}>
          {/* TODO: add close message behavior */}
          {this.props.msgDivClass === 'positive' ? <h1>Joined!</h1> : ''}
          <i className="close icon"></i>
          <div className="header small">
            <p>Let everyone know what you're bringing!</p>
            <p>Remember to commit to a contribution before joining!</p>
          </div>
          <p>Just check the box under a contribution.</p>
        </div>
        <div className="ui segment">
          <div className="ui header medium">{openContributions ? 'Bring Something!' : 'What people are brining'}</div>

          {this.props.isAttending && openContributions ? 
          <ContributeButton
            onClick={this.props.onContributionUpdate}
          /> : null}

          <div className="ui divider"></div>
          <div className="ui cards">
            {this.props.contributions.map((contrib, index) =>
              <Contribution
                key={index}
                {...contrib}
                ref={`contribution-${index}`}
                _onCheckBoxClick={this.props.onCheckBoxClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ContributionList;
// Above, the ...spread operater is used instead of:
// bringer={contrib.bringer}
// item={contrib.item}
// notes={contrib.notes}
// index={contrib.index}
