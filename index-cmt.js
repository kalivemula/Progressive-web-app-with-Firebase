
const ref = new Firebase("https://food-app-69dc9.firebaseio.com/Comments");
const reftoreply = new Firebase("https://food-app-69dc9.firebaseio.com/Replies");
/*
ref.on("value",function(snapshot)
      {
  console.log('foodpwa',snapshot.val());
});*/
const form = document.querySelector("form");

form.addEventListener("submit", postComment);

const timeStamp = () => {
  let options = {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute:'2-digit'
  };
  let now = new Date().toLocaleString('en-US', options);
  return now;
};

function postComment(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let comment = document.getElementById("comment").value;
  let addressFinder = document.getElementById("addressFinder").value;
  let postal_code = document.getElementById("postal_code").value;
  let guidout = document.getElementById("guidout").value;
  let horz = document.getElementById("horz");

  if (name && comment && addressFinder && postal_code) {
  
    ref.push({
      name: name,
      comment: comment,
      addressFinder: addressFinder,
      postal_code: postal_code,
      guidout: guidout,
      time: timeStamp()
    });
  }

/*  document.getElementById("name").value = '';
  document.getElementById("comment").value = '';
  document.getElementById("addressFinder").value = '';
  document.getElementById("postal_code").value = '';*/
};

ref.on("child_added", function(snapshot) {
  let obj = snapshot.val();
 // console.log(JSON.stringify(obj));

  let i=0;
  
   
  var newId = 'box' + i;
    //Create a new div eachtime
    var newDiv = document.createElement('DIV');
    newDiv.className="box";
    newDiv.id=newId;
    
    $('#comments').append(newDiv);
    var nameId='name'+i;
    var timestampId='timestamp'+i;
    var addressId='addressFinder'+i;
    var postalId='postal_code'+i;
    var commentsId='comment'+i;
    var replyId='reply'+i;
    
    //Horizontal line
    var horz = document.createElement("hr");
    newDiv.appendChild(horz);
       
    //Create a new label for name and timestamp
    var x = document.createElement("LABEL");
    var t = document.createTextNode(obj['name']);
    x.setAttribute("for", "male");
    x.appendChild(t);
    x.id=nameId;
    x.className='Namecss';
    newDiv.appendChild(x);
     
    // for time stamp
    var y = document.createElement("LABEL");
    var t = document.createTextNode(obj['time']);
    y.setAttribute("for", "Time");
    y.appendChild(t);
    y.id=timestampId;
    y.class='timecss';
    newDiv.appendChild(y);
    
    //break line
    var brk = document.createElement("br");
    newDiv.appendChild(brk);
   //address
    var ad = document.createElement("LABEL");
    var t = document.createTextNode(obj['addressFinder']);
    ad.setAttribute("for", "address");
    ad.appendChild(t);
    ad.id=addressId;
    ad.className='Addresscss';
    newDiv.appendChild(ad);
   //postalcode
    var po = document.createElement("LABEL");
    var t = document.createTextNode(obj['postal_code']);
    po.setAttribute("for", "postal");
    po.appendChild(t);
    po.id=postalId;
    po.className='Postalcss';
    newDiv.appendChild(po);
    
    //Horizontal line
    var hor = document.createElement("hr");
    newDiv.appendChild(hor);

    //For comment box
    var ct = document.createElement("p");
    var textct = document.createTextNode(obj['comment']);
    ct.appendChild(textct);
    ct.id=commentsId;
    ct.class='commentsCSS';
    newDiv.appendChild(ct);
  
    //For rply btn
    var rplybtn = document.createElement("input");        
    rplybtn.setAttribute("type", "button");
    rplybtn.setAttribute("class", "btn btn-primary");
    rplybtn.setAttribute("data-toggle", "modal");
    rplybtn.setAttribute("data-target", "#exampleModal");
    rplybtn.setAttribute("value", obj['guidout'] + "Reply");
  
   
   // rplybtn.setAttribute("value",obj['guidout']);
    rplybtn.id=replyId;
    newDiv.appendChild(rplybtn);
    rplybtn.onclick = callJavascriptFunction;
  
    //For reply button
 /*   var replybut = document.createElement("INPUT");
    replybut.setAttribute("type", "button");
    replybut.setAttribute("value",obj['guidout']);
  
    replybut.id=replyId;
    replybut.class='replyCSS';
    newDiv.appendChild(replybut);   
    replybut.onclick = function() { 
      alert(replybut.value); 
    };*/
  
    
    i++;
   
  
//guidoutput
  });
 var cid=null;
function callJavascriptFunction(event) {
   cid=this.value;
 // alert(cid);
}
function myFunction() {
   
     
 cid=cid.substr(0, cid.indexOf('R'));
  console.log(cid);
  let name=document.getElementById("name2").value;
  console.log(name);
  let reply=document.getElementById("comment2").value;
  console.log(reply);
  
   if (name && reply&&cid) {
     
    reftoreply.push({
      Comment_id:cid,
      name: name,
      reply: reply
    
    });
   }
};




(function() {
   function IDGenerator() {
   console.log("call to new id");
     this.length = 8;
     this.timestamp = +new Date;
     
     var _getRandomInt = function( min, max ) {
      return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
     }
     
     this.generate = function() {
       var ts = this.timestamp.toString();
       var parts = ts.split( "" ).reverse();
       var id = "";
       
       for( var i = 0; i < this.length; ++i ) {
        var index = _getRandomInt( 0, parts.length - 1 );
        id += parts[index];  
       }
       console.log(id);
       return id;
     }
   }
   
   document.addEventListener( "DOMContentLoaded", function() {
   
    var btn = document.querySelector( "#comment");
            
     
    output = document.querySelector( "#guidout" );
    console.log(output);
    btn.addEventListener( "click", function() {
      console.log("comment clicled");
      var generator = new IDGenerator();
      let vaid=generator.generate();
      console.log(vaid);
      output.innerHTML = generator.generate();  
    }, false);  
   }); 
 })();

function initialize() {
  initAutocomplete();
  initMap();
}
// autocomplete address
  var placeSearch, autocomplete;
  var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };
  
  function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('addressFinder')), {
        types: ['geocode']
      });
    autocomplete.addListener('place_changed', fillInAddress);
  }

  function fillInAddress() {
    var place = autocomplete.getPlace();
    for (var component in componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }

    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  }

  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
    
  }

// map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();

 /* document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  }); */
  geocodeAddress(geocoder, map);
}

function geocodeAddress(geocoder, resultsMap) {
  //var address = document.getElementById('address').value;
        
  ref.on("child_added", function (snapshot) {
    let obj = snapshot.val();
    var address = obj['addressFinder'];   
    geocoder.geocode({'address': address}, function(results) {
      
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      var content = obj['comment'];         
      var infowindow = new google.maps.InfoWindow()
      google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
        return function() {
          infowindow.setContent(content);
          infowindow.open(map,marker);
        };
      })(marker,content,infowindow)); 
    });
  });
}