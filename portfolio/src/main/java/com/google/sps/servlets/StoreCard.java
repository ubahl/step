/* Store Card:
Holds the information that goes onto the search results cards:
- Place ID
- Store Name
- Image
- Rating
*/

package com.google.sps.servlets;

import java.net.URL;
import java.util.Base64;
import com.google.maps.model.PlacesSearchResult;
import com.google.maps.model.Photo;
import com.google.maps.PlacesApi;
import com.google.maps.GeoApiContext;
import com.google.maps.PhotoRequest;
import com.google.maps.ImageResult;

public class StoreCard {
    String placeId ="";
    String name = "";
    float rating = 0.0f;
    String encodedPhoto;

    public StoreCard(PlacesSearchResult store, GeoApiContext geoApiContext) {
        placeId = store.placeId;
        name = store.name;
        rating = store.rating;

        // Get photo from Place API
        Photo[] photos = store.photos;
        String photoRef = photos[0].photoReference;
        PhotoRequest request = PlacesApi.photo(geoApiContext, photoRef).maxHeight(180).maxWidth(180);
        ImageResult photoResult = request.awaitIgnoreError();
        byte[] photoBytes = photoResult.imageData;
        encodedPhoto = new String(Base64.getEncoder().encode(photoBytes));
    }
}
