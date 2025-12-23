import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-2 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-3xl md:w-full md:max-h-[85vh] bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl rounded-xl md:rounded-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-base md:text-xl font-bold pr-8 line-clamp-1 text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                className="absolute right-3 md:right-4 top-3 md:top-4 w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-600"
              >
                <FaTimes size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal
