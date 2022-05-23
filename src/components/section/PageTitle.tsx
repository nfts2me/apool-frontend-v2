import styled from 'styled-components'

import { Link as BaseLink } from '@/src/components/assets/Link'

const Wrapper = styled.div`
  margin: 0 auto 30px;
  max-width: 100%;
  width: ${({ theme }) => theme.layout.maxWidth};
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.fontFamilyTitle};
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 4px;
  padding: 20px 0 0 0;

  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    font-size: 2.4rem;
    margin-bottom: 12px;
  }
`

const TitleText = styled.span`
  align-items: center;
  color: ${({ theme }) => theme.colors.textColor};
  display: inline-flex;
  gap: 12px;
  text-decoration: none;

  &[href]:hover {
    text-decoration: underline;
  }
`

const Link = styled(BaseLink)`
  --dimensions: 12px;

  height: var(--dimensions);
  width: var(--dimensions);

  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    --dimensions: 15px;

    height: var(--dimensions);
    width: var(--dimensions);
  }
`

const SubTitle = styled.p`
  color: ${({ theme }) => theme.colors.textColorLight};
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.3;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    font-size: 1.4rem;
  }
`

export const PageTitle: React.FC<{ title: string; subTitle?: string; href?: string }> = ({
  href,
  subTitle,
  title,
  ...restProps
}) => {
  const titleLinkProps = href ? { href: href, target: '_blank' } : {}

  return (
    <Wrapper {...restProps}>
      <Title>
        <TitleText as={href ? 'a' : 'span'} {...titleLinkProps}>
          {title} {href && <Link />}
        </TitleText>
      </Title>
      <SubTitle>{subTitle ? subTitle : '--'}</SubTitle>
    </Wrapper>
  )
}