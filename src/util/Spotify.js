const clientId = '';
let accessToken = '';

class Spotify extends React.Component {

  getAccessToken (){
    $.ajax({
      url: 'https://accounts.spotify.com/api/token',
      type: 'GET',
      dataType: 'json',
      success(response) {},
      error(jqXHR, status, errorThrown) {}
    });


  }
}
export default Spotify;
