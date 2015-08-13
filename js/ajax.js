    // Yelp AJAX request #####################################
    this.yelpRequest = function(search, listType) {


        // Random nonce generator
        this.nonceMaker = function() {
            return (Math.floor(Math.random() * 1e12).toString());
        };

        // yelp base-url
        this.yelp_url = 'https://instagram.com/oauth/authorize/?client_id=18a3182da3444fe6b2f87698cddc9a4e&redirect_uri=REDIRECT-URI&response_type=token';

        this.consumerSecret = '8gxFv_1m-atfA2dU0aMrIY3wOCw';
        this.tokenSecret = 'Egb10VCQ2kLIFPpo1QH2k4dgJIo';

        this.parameters = {
            oauth_consumer_key: '1OuzfDi-n-yJ2dIO-Ert3A',
            oauth_token: 'E8UWzwkiKlCxrsiiH7yHvgWoQ66bm87Q',
            oauth_nonce: nonceMaker(),
            oauth_timestamp: Math.floor(Date.now()/1000),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version: '2.0',
            callback: 'cb',
            tearm: '', //OPTION/TODO----------------------------------------- search term
            limit: 20,
            radius_filter: 40000,
            category_filter: search,
            location: DataModel.currentLoc //------------------------------------------------- bind location to search input value
        };

        // appends generated oauth-signature to parameters obj
        this.encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, consumerSecret, tokenSecret);
        this.parameters.oauth_signature = this.encodedSignature;

        // ajax request settings
        this.settings = {
            url: yelp_url,
            data: parameters,
            cache: true,
            dataType: 'jsonp',
            success: function(results) {

                console.log(results);

                // Clear old result items and markers befor sending new request (if they exist)
                if (DataModel.itemList.length > 0) {
                    DataModel.itemList.removeAll();
                }
                if (DataModel.markerArray.length > 0) {
                    DataModel.markerArray.removeAll();
                }

                // process results

                // loop through Yelp businesses array
                for (var i = 0; i < results.businesses.length; i++) {

                    // create an object for each business and push each object to the itemList array
                    DataModel.itemList.push({
                        name: results.businesses[i].name,
                        address: results.businesses[i].location.display_address,
                        url: results.businesses[i].url,
                        phone: results.businesses[i].display_phone,
                        img: results.businesses[i].image_url,
                        street_view: 'https://maps.googleapis.com/maps/api/streetview?key=AIzaSyDsUk8JPHC9zfd3CLCEAk9kRVR9RpopZN4&size=400x300&location='+results.businesses[i].location.display_address,
                        rating: results.businesses[i].rating_img_url,
                        text: results.businesses[i].snippet_text,
                        location: {
                            lat: results.businesses[i].location.coordinate.latitude,
                            lng: results.businesses[i].location.coordinate.longitude
                        },
                        id: i,
                        type: listType,
                        categories: results.businesses[i].categories,
                        marker: {},
                        visible: ko.observable(true)
                    });

                    // push each items categories as a string object to DataModel.categories array
                    var categories = (function() {
                        if (results.businesses[i].categories != undefined) {
                            categorieArr = results.businesses[i].categories.toString();
                            DataModel.categories.push(
                                {item: categorieArr}
                                );
                        }
                    })();
                }
            },
            error: function() {
                // process fail
                console.log('yelpRequest failed');
                alert('Sorry! We are having trouble getting search results from Yelp. Please try again later.');
            }
        };

        // send request
        $.ajax(settings);//TODO--------------------------------------- bind call to search event
        this.requestSent = true;
    };