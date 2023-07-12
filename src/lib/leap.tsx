import toast from 'react-hot-toast'

const leapWalletChromeStoreURL =
  'https://chrome.google.com/webstore/detail/leap-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg'

export const checkLeapInstallation = (isMobile: boolean) => {
  if (!window.leap && !isMobile) {
    const id = toast.error(
      () => {
        return (
          <div className="flex flex-col">
            <strong>Leap Wallet Not Detected</strong>
            <p className="text-sm">
              You can install it from{' '}
              <a
                href={leapWalletChromeStoreURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 underline"
              >
                here
              </a>
            </p>
          </div>
        )
      },
      {
        duration: Infinity
      }
    )
    window.addEventListener('beforeunload', () => {
      toast.dismiss(id)
    })
  }
}
