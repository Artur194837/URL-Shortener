document.getElementsByTagName("button")[0].addEventListener("click", async function(){
    const response = await fetch("http://localhost:3000", { //Sende eine POST Anfrage an den Server, um die URLs zu speichern
							            method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            "ursprung": document.getElementById("ursprung").value,
                                            "kuerzung": document.getElementById("kuerzung").value
                                        })
							        });
									        
    const responseText = await response.text();

    document.getElementById("meldung").innerHTML = responseText;
})