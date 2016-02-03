import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RecipeActions from '../actions/recipe';
import Panel from '../components/Panel';
import Timer from '../components/Timer';

const App = (props) => {
  const { recipe, actions } = props;

  return (
    <div id="container">
      <div className="row">
        <Panel component={recipe.coffee} op={actions.modCoffee} />
        <Panel component={recipe.water} op={actions.modWater} />
      </div>
      <div className="row">
        <Panel component={recipe.ratio} op={actions.modRatio} />
        <Timer />
      </div>
    </div>
  );
};

App.propTypes = {
  recipe: PropTypes.shape({
    coffee: PropTypes.object.isRequired,
    water: PropTypes.object.isRequired,
    ratio: PropTypes.object.isRequired,
  }).isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    recipe: state.recipe,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RecipeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
