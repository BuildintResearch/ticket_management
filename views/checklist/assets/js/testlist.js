function hw_test(){
    mbsn = document.getElementById('mbsn').value
    currdate = document.getElementById('datetime').value
    wifiname = document.getElementById('wifiswitchname').value
    macid = document.getElementById('macid').value
    deviceid = document.getElementById('deviceid').value
    rplnh = document.getElementById('rplnh').value
    rpleh = document.getElementById('rpleh').value
    upslnh = document.getElementById('upslnh').value
    upsleh = document.getElementById('upsleh').value
    temph = document.getElementById('temph').value
    humidityh = document.getElementById('humidityh').value
    bvh = document.getElementById('bvh').value
    
    ac1wh = document.getElementById('ac1wh').value
    ac1ch = document.getElementById('ac1ch').value
    ac1kwhh = document.getElementById('ac1kwhh').value
    ac2wh = document.getElementById('ac2wh').value
    ac2ch = document.getElementById('ac2ch').value
    ac2kwhh = document.getElementById('ac2kwhh').value
    lobbywh = document.getElementById('lobbywh').value
    lobbych = document.getElementById('lobbych').value
    lobbykwhh = document.getElementById('lobbykwhh').value
    signagewh = document.getElementById('signagewh').value
    signagech = document.getElementById('signagech').value
    signagekwhh = document.getElementById('signagekwhh').value
    dvrwh = document.getElementById('dvrwh').value
    dvrch = document.getElementById('dvrch').value
    dvrkwhh = document.getElementById('dvrkwhh').value
    upswh = document.getElementById('upswh').value
    upsch = document.getElementById('upsch').value
    upskwhh = document.getElementById('upskwhh').value
    atmwh = document.getElementById('atmwh').value
    atmch = document.getElementById('atmch').value
    atmkwhh = document.getElementById('atmkwhh').value

    door = document.getElementById('doorh').checked
    wifi  = document.getElementById('wifih').checked
    star = document.getElementById('starh').checked
    beep = document.getElementById('beeph').checked
    presence = document.getElementById('presenceh').checked
    ac1store = document.getElementById('ac1storeh').checked
    ac2store = document.getElementById('ac2storeh').checked
    lobbystore = document.getElementById('lobbystoreh').checked
    signagestore = document.getElementById('signagestoreh').checked
    dvrstore = document.getElementById('dvrstoreh').checked
    upsstore = document.getElementById('upstoreh').checked
    atmstore = document.getElementById('atmstoreh').checked

    ac1relay = document.getElementById('ac1relayh').checked
    ac2relay = document.getElementById('ac2relayh').checked
    lobbyrelay = document.getElementById('lobbyrelayh').checked
    signagerelay = document.getElementById('signagerelayh').checked
    vsatrelay = document.getElementById('vsatrelayh').checked
    routerrelay = document.getElementById('routerrelayh').checked
    atmrelay = document.getElementById('atmrelayh').checked
    sparerelay = document.getElementById('sparerelayh').checked

    notes = document.getElementById('notesh').value
    testedby = document.getElementById('testbyh').value
    console.log('hi')
    fetch('http://192.168.0.194:3000/form',{
        method:'POST',
        headers:{"Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"},
        body:'{"table":"test_hw","mbsn":"'+mbsn+'","currdate":"'+currdate+'","wifiname":"'+wifiname+'","macid":"'+macid+'","deviceid":"'+deviceid+'","rplnh":"'+rplnh+'","rpleh":"'+rpleh+'","upslnh":"'+upslnh+'","upsleh":"'+upsleh+'","temph":"'+temph+'","humidityh":"'+humidityh+'","battery_volt":"'+bvh+'","ac1watt":"'+ac1wh+'","ac1current":"'+ac1ch+'","ac1kwh":"'+ac1kwhh+'","ac2watt":"'+ac2wh+'","ac2current":"'+ac2ch+'","ac2kwh":"'+ac2kwhh+'","lbywatt":"'+lobbywh+'","lbycurrent":"'+lobbych+'","lbykwh":"'+lobbykwhh+'","signwatt":"'+signagewh+'","signcurrent":"'+signagech+'","signkwh":"'+signagekwhh+'","dvrwatt":"'+dvrwh+'","dvrcurrent":"'+dvrch+'","dvrkwh":"'+dvrkwhh+'","upswatt":"'+upswh+'","upscurrent":"'+upsch+'","upskwh":"'+upskwhh+'","atmwatt":"'+atmwh+'","atmcurrent":"'+atmch+'","atmkwh":"'+atmkwhh+'","door":"'+door+'","wifi":"'+wifi+'","star":"'+star+'","beep":"'+beep+'","presence":"'+presence+'","ac1store":"'+ac1store+'","ac2store":"'+ac2store+'","lbystore":"'+lobbystore+'","signstore":"'+signagestore+'","dvrstore":"'+dvrstore+'","upsstore":"'+upsstore+'","atmstore":"'+atmstore+'","ac1relay":"'+ac1relay+'","ac2relay":"'+ac2relay+'","lbyrelay":"'+lobbyrelay+'","signrelay":"'+signagerelay+'","vsatrelay":"'+vsatrelay+'","routerrelay":"'+routerrelay+'","atmrelay":"'+atmrelay+'","sparerelay":"'+sparerelay+'","notes":"'+notes+'","testedby":"'+testedby+'"}'
    })
}

function data_test(){
    mbsn1 = document.getElementById('mbsn1').value
    currdate1 = document.getElementById('datetime').value
    rplnd = document.getElementById('rplnd').value
    rpled = document.getElementById('rpled').value
    upslnd = document.getElementById('upslnd').value
    upsled = document.getElementById('upsled').value
    tempd = document.getElementById('tempd').value
    humidityd = document.getElementById('humidityd').value
    bvd = document.getElementById('bvd').value

    doord = document.getElementById('doord').checked
    wifid = document.getElementById('wifid').checked
    stard = document.getElementById('stard').checked
    presenced = document.getElementById('presenced').checked

    ac1wd = document.getElementById('ac1wd').value
    ac1cd = document.getElementById('ac1cd').value
    ac1kwhd = document.getElementById('ac1kwhd').value
    ac1stored = document.getElementById('ac1stored').value
    ac2wd = document.getElementById('ac2wd').value
    ac2cd = document.getElementById('ac2cd').value
    ac2kwhd = document.getElementById('ac2kwhd').value
    ac2stored = document.getElementById('ac2stored').value
    lobbywd = document.getElementById('lobbywd').value
    lobbycd = document.getElementById('lobbycd').value
    lobbykwhd = document.getElementById('lobbykwhd').value
    lobbystored = document.getElementById('lobbystored').value
    signagewd = document.getElementById('signagewd').value
    signagecd = document.getElementById('signagecd').value
    signagekwhd = document.getElementById('signagekwhd').value
    signagestored = document.getElementById('signagestored').value
    dvrwd = document.getElementById('dvrwd').value
    dvrcd = document.getElementById('dvrcd').value
    dvrkwhd = document.getElementById('dvrkwhd').value
    dvrstored = document.getElementById('dvrstored').value
    upswd = document.getElementById('upswd').value
    upscd = document.getElementById('upscd').value
    upskwhd = document.getElementById('upskwhd').value
    upstored = document.getElementById('upstored').value
    atmwd = document.getElementById('atmwd').value
    atmcd = document.getElementById('atmcd').value
    atmkwhd = document.getElementById('atmkwhd').value
    atmstored = document.getElementById('atmstored').value

    ac1relayd = document.getElementById('ac1relayd').checked
    ac2relayd = document.getElementById('ac2relayd').checked
    lobbyrelayd = document.getElementById('lobbyrelayd').checked
    signagerelayd = document.getElementById('signagerelayd').checked
    vsatrelayd = document.getElementById('vsatrelayd').checked
    routerrelayd = document.getElementById('routerrelayd').checked
    atmrelayd = document.getElementById('atmrelayd').checked
    sparerelayd = document.getElementById('sparerelayd').checked

    notesd = document.getElementById('notesd').value
    testedbyd = document.getElementById('testbyd').value
    
    fetch('http://192.168.0.194:3000/form',{
        method:'POST',
        headers:{"Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"},
        body:'{"table":"test_sw","mbsn":"'+mbsn1+'","currdate":"'+currdate1+'","raw_powerln":"'+rplnd+'","raw_powerle":"'+rpled+'","ups_powerln":"'+upslnd+'","ups_powerle":"'+upsled+'","temp":"'+tempd+'","humidity":"'+humidityd+'","battery_volt":"'+bvd+'","ac1watt":"'+ac1wd+'","ac1current":"'+ac1cd+'","ac1kwh":"'+ac1kwhd+'","ac2watt":"'+ac2wd+'","ac2current":"'+ac2cd+'","ac2kwh":"'+ac2kwhd+'","lbywatt":"'+lobbywd+'","lbycurrent":"'+lobbycd+'","lbykwh":"'+lobbykwhd+'","signwatt":"'+signagewd+'","signcurrent":"'+signagecd+'","signkwh":"'+signagekwhd+'","dvrwatt":"'+dvrwd+'","dvrcurrent":"'+dvrcd+'","dvrkwh":"'+dvrkwhd+'","upswatt":"'+upswd+'","upscurrent":"'+upscd+'","upskwh":"'+upskwhd+'","atmwatt":"'+atmwd+'","atmcurrent":"'+atmcd+'","atmkwh":"'+atmkwhd+'","door":"'+doord+'","wifi":"'+wifid+'","star":"'+stard+'","presence":"'+presenced+'","ac1store":"'+ac1stored+'","ac2store":"'+ac2stored+'","lbystore":"'+lobbystored+'","signstore":"'+signagestored+'","dvrstore":"'+dvrstored+'","upsstore":"'+upstored+'","atmstore":"'+atmstored+'","ac1relay":"'+ac1relayd+'","ac2relay":"'+ac2relayd+'","lbyrelay":"'+lobbyrelayd+'","signrelay":"'+signagerelayd+'","vsatrelay":"'+vsatrelayd+'","routerrelay":"'+routerrelayd+'","atmrelay":"'+atmrelayd+'","sparerelay":"'+sparerelayd+'","notes":"'+notesd+'","testedby":"'+testedbyd+'"}'
    })
}