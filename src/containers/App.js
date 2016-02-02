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
            title={recipe.coffee.title}
            value={recipe.coffee.value}
            displayInOz={recipe.coffee.displayInOz}
            editing={recipe.coffee.editing}
            op={actions.modCoffee}
          />

          <Panel
            title={recipe.water.title}
            value={recipe.water.value}
            displayInOz={recipe.water.displayInOz}
            editing={recipe.water.editing}
            op={actions.modWater}
          />

        </div>

        <div className="row">

          <Panel
            title={recipe.ratio.title}
            value={recipe.ratio.value}
            displayInOz={recipe.ratio.displayInOz}
            editing={recipe.ratio.editing}
            op={actions.modRatio}
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
