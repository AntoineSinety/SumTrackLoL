const key = "RGAPI-c82c74d6-0810-4d79-bf25-d8d2d38f3e4e";
var version = "12.5.1"
var championId = 40;

export const getInfoSummoner = async (name) =>{
	var getPuuidEUWAcc = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+name +'?api_key='+key;

	return fetch(getPuuidEUWAcc)
	.then(response => response.json())
	.then(data => {
        return data
    })
}

export const getCurrentGame = async (name) =>{
	var getPuuidEUWAcc = 'https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/'+name +'?api_key='+key;

	return fetch(getPuuidEUWAcc)
	.then(response => response.json())
	.then(data => {
        return data
    })
}

export const getJsonSummonerPSells = async () =>{
	var getPuuidEUWAcc = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json";

	return fetch(getPuuidEUWAcc)
	.then(response => response.json())
	.then(data => {
        return data
    })
}



export const getChampName = (id) => {
	return fetch('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/fr_FR/champion.json')
	.then(response => response.json())
	.then(list => {
		let championList = list.data;

		for (var i in championList) {

			if (championList[i].key == id) {
				return championList[i].id
			}

		}
        // return list.data.filter( (e) => e.key === id)
    })

}

// export const getAllRunes = async (name) =>{
// 	var getPuuidEUWAcc = 'http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/runesReforged.json';

// 	return fetch(getPuuidEUWAcc)
// 	.then(response => response.json())
// 	.then(data => {
//         return data
//     })
// }