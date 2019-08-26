export default {
	general: {},		//기준정보 상세
	generalHistory: [],	//기준정보 history
	generalHistoryDetail: {},
	vm: {vms: []},		
	vmHistory: [],		
	vmHistoryDetail: {vms: []},
	storage: {fileStorages: []},
	storageHistory: [],
	storageHistoryDetail: {fileStorages: []},
	
	products: [],
	productMspCost: {},
	productMspCostHistory: [],
	productMspCostHistoryDetail: {},
	
	hardwareTypes: [],
	fileStorageTypes: [],
	enduranceIops: [],
	classificationTypes: [],
	environmentTypes: [],
	
	projects: [],
	project: {},
	projectVolume: {},
	projectCostEstimate: {	//편집중인 원가견적
  		environments: [],
  		summary: {environments: []}
	},
	productReferences: [],	//product addon-service & estimate template
	projectCostEstimateHistory: [],
	projectCostEstimateHistoryDetailStatus: false,
	projectCostEstimateHistoryDetail: {},
	customers: []
}