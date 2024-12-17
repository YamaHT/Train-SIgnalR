import { HubConnectionBuilder } from '@microsoft/signalr'
import { Constraints } from 'src/utils/Constraints'

const createHubConnection = (hubUrl) => {
	return new HubConnectionBuilder()
		.withUrl(Constraints.BASE_URL + hubUrl)
		.withAutomaticReconnect()
		.build()
}

export const SignalRService = {
	ProductHub: createHubConnection('/productHub'),
}
