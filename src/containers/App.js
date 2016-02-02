import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as RecipeActions from '../actions/recipe'
import Panel from '../components/Panel'
import Timer from '../components/Timer'

class App extends Component {
  render() {
    const { recipe, actions } = this.props
    return (
      <div id="container">

        <div className="row">

          <Panel
            title="Coffee"
            value={recipe.coffee}
            operation={actions.modCoffee}
          />

          <Panel
            title="Water"
            value={recipe.water}
            operation={actions.modWater}
          />

        </div>

        <div className="row">

          <Panel
            title="Ratio"
            value={recipe.ratio}
            operation={actions.modRatio}
          />

          <Timer />

        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipe
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RecipeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
