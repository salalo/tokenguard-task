import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CustomSelect } from "@/components/custom-select"
import { Chart } from "@/components/chart"
import { fetchGrowthIndex } from '../api/index'
import { ChartLoader } from "@/components/chart-loader"
import { ChainsData, Granularity } from '../types/types'
import { ChainOption, GranularityOption } from '../enums/enums'

const granularityOptions = Object.values(GranularityOption);
const chainOptions = Object.values(ChainOption);

function Hero() {
  const [selectedChain1, setSelectedChain1] = useState<string>('ethereum')
  const [selectedChain2, setSelectedChain2] = useState<string>('solana')
  const [selectedGranularity, setSelectedGranularity] = useState<Granularity>('1 week')

  const chain1Options = chainOptions.filter(chain => chain !== selectedChain2)
  const chain2Options = chainOptions.filter(chain => chain !== selectedChain1)

  const { isLoading, error, data } = useQuery<boolean, Error, ChainsData>({
    queryKey: ['chain-growth-data', selectedChain1, selectedChain2],
    queryFn: () => fetchGrowthIndex(selectedChain1, selectedChain2),
  })

  if (isLoading) return <ChartLoader />

  if (error) return 'An error has occurred, please try again later.'

  return (
    <>
      <div className='flex flex-row justify-center items-center gap-4 mb-8'>
        <CustomSelect onChange={value => setSelectedChain1(value)} value={selectedChain1} options={chain1Options} label="Select blockchain" />
        <CustomSelect onChange={value => setSelectedChain2(value)} value={selectedChain2} options={chain2Options} label="Compare with" />
        <CustomSelect onChange={value => setSelectedGranularity(value as Granularity)} value={selectedGranularity} options={granularityOptions} label="Select granularity" />
      </div>

      {/* probably props could be passed nicer // not sure about the foramtting/cumulative situation */}
      {data && <Chart chain1={data.blockchain} chain2={data.cumulative} chain1Name={selectedChain1} chain2Name={selectedChain2} granularity={selectedGranularity} />}
    </>
  )
}

export default Hero;