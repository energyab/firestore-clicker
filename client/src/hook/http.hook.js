const getClick = ( link ) => {
	try {
		fetch(link)
	   	} catch (e) {
	      console.log(e.message)
	    }
}

export default getClick;