import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'

import { CardTitle, CardWithTitle } from '@/src/components/common/CardWithTitle'
import { PageTitle } from '@/src/components/common/PageTitle'
import { RightTimelineLayout } from '@/src/components/layout/RightTimelineLayout'
import Invest from '@/src/components/pools/actions/Invest'
import { Timeline } from '@/src/components/pools/common/Timeline'
import DealCreate from '@/src/components/pools/deal/DealCreate'
import DealInformation from '@/src/components/pools/deal/DealInformation'
import PoolInformation from '@/src/components/pools/main/PoolInformation'
import { BaseCard } from '@/src/components/pureStyledComponents/common/BaseCard'
import { ChainsValues } from '@/src/constants/chains'
import { PoolTimelineState } from '@/src/constants/types'
import useAelinPoolStatus from '@/src/hooks/aelin/useAelinPoolStatus'
import { PoolAction, PoolStatus } from '@/types/aelinPool'

const MainGrid = styled.div`
  column-gap: 65px;
  display: grid;
  row-gap: 20px;

  @media (min-width: ${({ theme }) => theme.themeBreakPoints.desktopStart}) {
    grid-template-columns: 1fr 310px;
  }
`

const ContentGrid = styled.div`
  display: grid;
  row-gap: 20px;
  column-gap: 70px;

  @media (min-width: ${({ theme }) => theme.themeBreakPoints.desktopStart}) {
    grid-template-columns: 1fr 1fr;
  }
`

const ActionsCard = styled(BaseCard)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: fit-content;
  justify-content: center;
  min-height: 236px;
  padding: 30px 40px;
`

type Props = {
  chainId: ChainsValues
  poolAddress: string
}

export default function PoolMain({ chainId, poolAddress }: Props) {
  const { actions, current, dealing, funding, pool, tabs } = useAelinPoolStatus(
    chainId,
    poolAddress as string,
  )
  const mockedPoolVisibility = '???'

  if (!current) {
    throw new Error('There was no possible to calculate pool current status')
  }

  const [tab, setTab] = useState<PoolStatus>(tabs[0])
  const showCreateDealForm = actions.includes(PoolAction.CreateDeal)
  const dealExists = pool.deal
  const activeItem = dealExists
    ? PoolTimelineState.dealWindow
    : showCreateDealForm
    ? PoolTimelineState.dealCreation
    : PoolTimelineState.investmentWindow

  return (
    <>
      <Head>
        <title>Aelin - {pool.nameFormatted}</title>
      </Head>
      <PageTitle subTitle={mockedPoolVisibility} title={pool.nameFormatted} />
      <RightTimelineLayout timeline={<Timeline activeItem={activeItem} />}>
        {showCreateDealForm ? (
          <DealCreate pool={pool} />
        ) : (
          <MainGrid>
            <CardWithTitle
              titles={
                <>
                  {tabs.includes(PoolStatus.Funding) && (
                    <CardTitle
                      isActive={tab === PoolStatus.Funding}
                      onClick={() => setTab(PoolStatus.Funding)}
                    >
                      Pool information
                    </CardTitle>
                  )}
                  {tabs.includes(PoolStatus.DealPresented) && dealExists && (
                    <CardTitle
                      isActive={tab === PoolStatus.DealPresented}
                      onClick={() => setTab(PoolStatus.DealPresented)}
                    >
                      Deal information
                    </CardTitle>
                  )}
                  {tabs.includes(PoolStatus.Vesting) && (
                    <CardTitle
                      isActive={tab === PoolStatus.Vesting}
                      onClick={() => setTab(PoolStatus.Vesting)}
                    >
                      Vest
                    </CardTitle>
                  )}
                </>
              }
            >
              <ContentGrid>
                {tab === PoolStatus.Funding && (
                  <PoolInformation pool={pool} poolAddress={poolAddress} />
                )}
                {tab === PoolStatus.DealPresented && dealExists && (
                  <DealInformation pool={pool} poolStatusHelper={dealing} />
                )}
                {tab === PoolStatus.Vesting && <div>Vest info will appear here</div>}
              </ContentGrid>
            </CardWithTitle>
            <ActionsCard>
              {!actions.length && <div>No actions available</div>}
              {actions.includes(PoolAction.Invest) && <Invest pool={pool} poolHelpers={funding} />}
              {actions.includes(PoolAction.Withdraw) && (
                <div>Give me my tokens back!! (Withdraw form)</div>
              )}
            </ActionsCard>
          </MainGrid>
        )}
      </RightTimelineLayout>
    </>
  )
}