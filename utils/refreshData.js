const refreshData = (gender) => {
    console.log('refreshData', gender)
}

export default refreshData


// TESTES

// function refreshPageContent(genderString){
//     let newPathName;
//     const pathNameGender = pathname.includes('women');
//     if(!pathNameGender && genderString == 'women'){
//       newPathName = '/gallery/women'
//     }else if(pathNameGender && genderString === 'men'){
//       newPathName = '/gallery/men'
//     }
//     if(newPathName) router.push(newPathName)
// }