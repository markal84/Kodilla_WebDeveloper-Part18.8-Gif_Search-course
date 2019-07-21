App = React.createClass({

    getInitialState() {
        return {
            loading: false, // default state is no loading gif
            searchingText: '', // default text in search input is empty
            gif: {} // no gif to display as default
        };
    },

    handleSearch: function(searchingText) {  // gif search function - paramater is searched text
        this.setState({
          loading: true  // set load state to true ( display loading gif)
        });
        this.getGif(searchingText, function(gif) {  // start gif download
          this.setState({  
            loading: false,  // set state as finished loading
            gif: gif,  //update gif state - here with searched gif
            searchingText: searchingText  // update text state - text inputed by user used as parameter
          });
        }.bind(this));
    },

    getGif: function(searchingText, callback) {  
        var GIPHY_API_URL = 'https://api.giphy.com';
        var GIPHY_PUB_KEY = 'PV2ALIA0kck4cQHnrh3wKImWbwVigUsJ';

        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // Constructed url address for giphy API
        var xhr = new XMLHttpRequest();  // new request to server
        xhr.open('GET', url); // get status form constructed url
        xhr.onload = function() {
            if (xhr.status === 200) { // if response is ok
               var data = JSON.parse(xhr.responseText).data; // create data var to simplify
                var gif = {  // create gif object from server response
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif); // 
            }
        };
        xhr.send();
    },

    render: function() {

        var styles = {
            margin: '50px auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>GIF search engine</h1>
                <p>Search gif on <a href='http://giphy.com'>giphy</a></p>
                <Search 
                    onSearch={this.handleSearch} 
                />
            <Gif 
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
          </div>
        );
    }
});