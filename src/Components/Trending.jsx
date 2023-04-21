const Trending = (props) => {
  const {data} = props

  return (
    <div className='flex bg-slate-600 my-2 p-2 items-center space-x-3 text-white rounded-xl'>
      <img src={data.coverImage.extraLarge} alt="cover" width="50px"/>
      <p>{data.title.romaji}</p>
    </div>
  )
}

export default Trending