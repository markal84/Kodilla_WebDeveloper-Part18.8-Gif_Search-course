Search = React.createClass({
    
    getInitialState() {
        return {
        searchingText: ''
        };
    },

    handleChange: function(event) {
        var searchingText = event.target.value;
        this.setState({searchingText: searchingText});
    
        if (searchingText.length > 2) { // we need more than 2 letters to display a correct search result
          this.props.onSearch(searchingText);
        }
      },
    
      handleKeyUp: function(event) {
        if (event.keyCode === 13) { // keyCode 13 is an enter key
          this.props.onSearch(this.state.searchingText);
        }
      },
    
    render: function() {
        var styles = {fontSize: '1.3em', width: '90%', maxWidth: '350px', padding: '10px'};
    
        return <input
                 type="text"
                 onChange={this.handleChange}
                 onKeyUp={this.handleKeyUp}
                 placeholder="Enter your search term here"
                 style={styles}
                 value={this.state.searchTerm}
                />
      }
});